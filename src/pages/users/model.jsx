export default {
    model: '',
    api: '/users',
    apiAdd: '/users',
    schema: [
        { id: "select", type: "checkbox", hiddenCreator: true },
        // { accessorKey: "full_name", header: "Usuário", type: "capitalize", fieldType: 'text', hiddenCreator: false },
        { accessorKey: "email", header: "Email", type: "sort", fieldType: 'email', required: true },
        // { accessorKey: "phone", header: "Celular", type: "lowercase", fieldType: 'mobile', },
        { id: "actions", type: "actions", hiddenCreator: true },
        // { accessorKey: "password", header: "Senha", type: "password", fieldType: 'password', hiddenInTable: true }
    ],
    filters: [
        { input: 'email', name: 'E-mail' },
        // { input: 'phone', name: 'Celular' },
        // { input: 'full_name', name: 'Nome' },
    ]
}

