import { useEffect, useContext } from "react";
import DataTableDefault from "./data-table";
import ServiceContext from './context';
import UserCreationForm from './userCreationForm';
import { toast } from 'react-toastify';


export default function ListUsersPage(props) {
  const {
    list,
    setList,
    getAll,
    postServices,
    patchServices,
    setModel,
    model,
    isShowForm,
    setIsShowForm,
    original
  } = useContext(ServiceContext);

  const _getData = () => {
    const params = {
      useCache: false,
    };
    return getAll(params);
  };

  useEffect(() => {
    setModel(props?.model);
  }, []);

  useEffect(() => {
    if (model) {
      fetchData();
    }
  }, [model]);

  async function fetchData() {
    const arr = [];
    const result = await _getData();
    result.getAllPages(res => {
      arr.push(...res.data.data);
      if (!result?.hasNextPage()) {
        setList(arr);
      }
    });
  }

  const handleAddUser = () => {
    setIsShowForm(true);
  };

  const handleCreate = async (fields) => {
    try {
      await postServices(fields).then(res => {
        fetchData();
        setIsShowForm(false);
        toast.success(res?.data?.message);
      }).catch(error => {
        toast.error(`${error?.response?.data?.errors[0]}`);
      })
    } catch (error) {
      toast.error(`Erro ao criar usuário: ${error}`);
    }
  };
  const handleChange = async (id, fields) => {
    try {
      console.log(fields)
      await patchServices(id, fields).then(res => {
        fetchData();
        setIsShowForm(false);
        toast.success(res?.data?.message);
      }).catch(error => {
        toast.error(`${error?.response?.data?.errors[0]}`);
      })
    } catch (error) {
      toast.error(`Erro ao criar usuário: ${error}`);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <button
        onClick={handleAddUser}
        className="mb-4 px-4 py-2 bg-zinc-800 text-white rounded border-2 border-zinc-600 hover:bg-zinc-600"
      >
        Adicionar
      </button>

      {list && model ?
        <DataTableDefault data={list} /> : null}

      {isShowForm && (
        <UserCreationForm
          original={original}
          fields={props.model.schema}
          onSubmit={handleCreate}
          onChange={(id, fields) => handleChange(id, fields)}
          onCancel={() => setIsShowForm(false)}
        />
      )}
    </div>
  );
}
