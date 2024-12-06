import React, { useState, useEffect } from 'react';
import { TreeSelect } from 'primereact/treeselect';
import { useQuery } from 'react-query';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { get } from '../../api/funcRequest';

export const MenuTreeSelect = ({
  valueMenuSelect,
  optionsMenuSelect,
  onChangeMenuSelect,
  placeholderMenuSelect,

}) => {
  const [treeData, setTreeData] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState(null);

  
  const { data: dadosGrupos = [], error: errorGrupo, isLoading: isLoadingGrupo } = useQuery(
    'grupo-produto',
    async () => {
      const response = await get(`/grupo-produto`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000 }
  );

 
  const { data: dadosSubGrupos = [], error: errorSubGrupo, isLoading: isLoadingSubGrupo } = useQuery(
    'subgrupo-produto',
    async () => {
      const response = await get(`/subgrupo-produto`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000 }
  );

 
  useEffect(() => {
    if (dadosGrupos.length && dadosSubGrupos.length) {
      const formattedTreeData = dadosGrupos.map(grupo => ({
        key: grupo.ID_GRUPO,
        label: grupo.GRUPO,
        children: dadosSubGrupos
          .filter(subgrupo => subgrupo.ID_GRUPO === grupo.ID_GRUPO)
          .map(subgrupo => ({
            key: subgrupo.ID_ESTRUTURA,
            label: subgrupo.ESTRUTURA,
          })),
      }));
      setTreeData(formattedTreeData);
    }
  }, [dadosGrupos, dadosSubGrupos]);



  if (isLoadingGrupo || isLoadingSubGrupo) {
    return <div>Carregando...</div>;
  }

  if (errorGrupo || errorSubGrupo) {
    return <div>Erro ao carregar dados.</div>;
  }

  return (
    <div className="card flex justify-content-center">
      
      <TreeSelect
        value={valueMenuSelect}
        options={optionsMenuSelect}
        onChange={(e) => onChangeMenuSelect(e)}
        placeholder={placeholderMenuSelect}
        display="chip"
        selectionMode="checkbox"
        className="w-full md:w-20rem"
      />
    </div>
  );
};


