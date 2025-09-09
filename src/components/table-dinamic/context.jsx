import { createContext, useState } from 'react';
import api from '@/common/utils/axios';
import { toast } from 'react-toastify';
import Paginator from '@/common/services/paginator';
import useStateWithCallback from '@/common/utils/useStateWithCallback';


const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState(null); false
    const [isShowForm, setIsShowForm] = useState(false);
    const [original, setOriginal] = useStateWithCallback(null);

    const get = async (id) => {
        if (!id) {
            toast.error('ID é obrigatório.');
            return null;
        }
        try {
            return await api.get(`${model.api}/${id}`);
        } catch (error) {
            toast.error(error.message);
            return null;
        }
    }


    const getAll = (config) => {
        try {
            config = config || {};
            return new Paginator({
                url: `${model.api}`,
                config: config,
                useCache: typeof config.useCache === 'boolean' ? config.useCache : true,
            });

        } catch (error) {
            toast.error(error);
            return;
        }
    };

    const postServices = (data, config) => {
        return api.post(`${model.apiAdd}`, data, config);
    };


    const putServices = (id, data, config) => {
        return api.put(`${model.api}/${id}/`, data, config);
    };

    const patchServices = (id, data, config) => {
        return api.patch(`${model.api}/${id}`, data, config);
    };

    const deleteServices = (id, config) => {
        return api.delete(`${model.api}/${id}`, config);
    };

    const changeOriginal = (original) => {
        setOriginal(original, () => {
            setIsShowForm(true);
        });
    }

    return (
        <ServicesContext.Provider value={{
            list,
            setList,
            loading,
            setLoading,
            get,
            getAll,
            postServices,
            putServices,
            patchServices,
            deleteServices,
            setModel,
            model,
            setIsShowForm,
            isShowForm,
            setOriginal,
            original,
            changeOriginal
        }}>
            {children}
        </ServicesContext.Provider>
    );
};

export default ServicesContext;
