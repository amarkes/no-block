/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import {
    CaretSortIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import ServiceContext from './context';
import { useAlertDialog } from '@/components/alert/AlertDialogContext';
import { useContext } from "react";

const _setCheckboxHeader = table => {
    return <Checkbox
        checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
    />
}

const _setCheckboxCell = row => {
    return <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
    />
}

const _sortByOrderHeader = (column, value) => {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {value}
            <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
    )
}

const _currencyCell = (row, value, formated = 'pt-BR', currency = 'BRL') => {
    const amount = parseFloat(row.getValue(value))
    const formatted = new Intl.NumberFormat(formated, {
        style: "currency",
        currency: currency,
    }).format(amount)

    return <div className="text-right font-medium">{formatted}</div>
}

// ✅ Transformei _actionsCell em um Componente
const ActionsCell = ({ row }) => {
    const payment = row.original;
    const { showAlert } = useAlertDialog();
    const { deleteServices, getAll, setList, changeOriginal } = useContext(ServiceContext);

    const fetchData = async () => {
        const params = { useCache: false };
        const arr = [];
        const result = await getAll(params);

        if (!result || typeof result.getAllPages !== 'function') {
            console.error("Erro: resultado inválido de getAll", result);
            return;
        }

        await result.getAllPages(res => {
            arr.push(...res.data.results);
            if (!result?.hasNextPage()) {
                setList(arr);
            }
        });
    };

    const _handleDelete = () => {
        showAlert(`Tem certeza que deseja deletar o item ${payment.id}?`, async () => {
            await deleteServices(payment.id);
            await fetchData();
        });
    };

    const _handleView = () => {
        console.log(payment)
        changeOriginal(payment);

    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                    Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={_handleView}>
                    Visualizar
                </DropdownMenuItem>
                {/* <DropdownMenuItem>Detalhes do pagamento</DropdownMenuItem> */}
                <DropdownMenuItem onClick={_handleDelete}>
                    Deletar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

// ✅ Função de Filtro
const caseInsensitiveFilter = (row, columnId, filterValue) => {
    const cellValue = row.getValue(columnId);
    if (cellValue === null || cellValue === undefined) return false;

    const normalizedCellValue = cellValue.toString().toLowerCase();
    const normalizedFilterValue = filterValue.toString().toLowerCase();

    return normalizedCellValue.includes(normalizedFilterValue);
};

// ✅ Corrigido para evitar erro se model for undefined
export const columns = (model) => {
    if (!model?.schema) {
        console.warn("Model está indefinido ou não contém um schema:", model);
        return [];
    }

    return model.schema
        .filter(col => !col.hiddenInTable)
        .map((col) => {
            switch (col.type) {
                case "checkbox":
                    return {
                        id: col.id,
                        header: ({ table }) => _setCheckboxHeader(table),
                        cell: ({ row }) => _setCheckboxCell(row),
                        enableSorting: false,
                        enableHiding: false,
                        filterFn: caseInsensitiveFilter,
                    };

                case "sort":
                    return {
                        accessorKey: col.accessorKey,
                        header: ({ column }) => _sortByOrderHeader(column, col?.header),
                        cell: ({ row }) => <div className="lowercase">{row.getValue(col.accessorKey)}</div>,
                        filterFn: caseInsensitiveFilter,
                    };

                case "currency":
                    return {
                        accessorKey: col.accessorKey,
                        header: () => <div className="text-right">{col?.header}</div>,
                        cell: ({ row }) => _currencyCell(row, col.accessorKey),
                        filterFn: caseInsensitiveFilter,
                    };

                case "capitalize":
                    return {
                        accessorKey: col.accessorKey,
                        header: col.header,
                        cell: ({ row }) => <div className="capitalize">{row.getValue(col.accessorKey)}</div>,
                        filterFn: caseInsensitiveFilter,
                    };

                case "lowercase":
                    return {
                        accessorKey: col.accessorKey,
                        header: col.header,
                        cell: ({ row }) => <div className="lowercase">{row.getValue(col.accessorKey)}</div>,
                        filterFn: caseInsensitiveFilter,
                    };

                case "actions":
                    return {
                        id: col.id,
                        enableHiding: false,
                        cell: ({ row }) => <ActionsCell row={row} />,
                        filterFn: caseInsensitiveFilter,
                    };

                default:
                    return {
                        accessorKey: col.accessorKey,
                        header: col.header,
                        cell: ({ row }) => <div>{row.getValue(col.accessorKey)}</div>,
                        filterFn: caseInsensitiveFilter,
                    };
            }
        });
};
