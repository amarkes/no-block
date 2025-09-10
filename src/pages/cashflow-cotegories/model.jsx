export default {
    model: 'cashflow',
    api: '/cashflow/categories',
    apiAdd: '/cashflow/categories',
    schema: [
        { id: "select", type: "checkbox", hiddenCreator: true },
        { accessorKey: "name", header: "Nome", type: "sort", fieldType: 'text', required: true },
        { 
            accessorKey: "type", 
            header: "Tipo", 
            type: "sort", 
            fieldType: 'select', 
            required: true,
            fieldOption: [
                { value: 'income', label: 'Receita' },
                { value: 'expense', label: 'Despesa' }
            ]
        },
        { accessorKey: "color", header: "Cor", type: "color", fieldType: 'text', required: false },
        { accessorKey: "icon", header: "Ícone", type: "text", fieldType: 'text', required: false },
        { accessorKey: "created_at", header: "Criado em", type: "date", fieldType: 'date', hiddenCreator: true },
        { id: "actions", type: "actions", hiddenCreator: true }
    ],
    filters: [
        { input: 'name', name: 'Nome' },
        { input: 'type', name: 'Tipo' },
        { input: 'color', name: 'Cor' }
    ]
}

