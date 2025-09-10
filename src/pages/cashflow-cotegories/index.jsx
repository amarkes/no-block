import TableComponent from '@/components/table-dinamic/page'
import Model from './model';

export default function CashflowCategoriesPage() {
 
  return (
    <div className="container mx-auto py-10">
      <TableComponent model={Model} />
    </div>
  );
}
