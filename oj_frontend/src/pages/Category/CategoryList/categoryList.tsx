import React, {useEffect, useState} from 'react';
import {message, Table, Tag} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import {v4 as uuid} from 'uuid';
import {GetCategoryList} from "@/services/oj-api/api_problem";

const columns: ColumnsType<API.CategoryBasic> = [
  {
    title: ' ',
    dataIndex: 'rank',
    key: 'rank',
    render: (value, record, index)=> {
      return <div style={{fontSize:"16px"}}>{index + 1}</div>
    }
  },
  {
    title: '分类',
    dataIndex: 'name',
    key: 'name',
    render: (value, record, )=> {
      return <Tag color={"blue"} style={{fontSize:"16px"}}>{record.name}</Tag>
    },
  },
  {
    title: '唯一标识',
    dataIndex: 'identity',
    key: 'identity',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    key: 'updated_at',
  },
];

const CategoryList: React.FC = () => {
  const [data, setData] = useState<API.CategoryBasic[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<API.TableParams>({
    pagination: {
      current: 1,
      pageSize: 12,
      showQuickJumper: true,
      showSizeChanger: true,
    },

  });

  const fetchData = () => {
    setLoading(true);
    GetCategoryList(tableParams.pagination).then((results) => {
      if (results.code === 200) {
        setData(results.data.list);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: results.data.count,
          },
        });
      } else {
        message.error(results.msg)
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<API.CategoryBasic>,
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      rowKey={()=>{return uuid()}}
      // @ts-ignore
      onChange={handleTableChange}
    />
  );
}

export default CategoryList;
