import React, {useEffect, useState} from 'react';
import {message, Table} from 'antd';
import {GetRankList} from "@/services/oj-api/api_user";
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import {v4 as uuid} from 'uuid';

const columns: ColumnsType<API.UserInfo> = [
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
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '邮箱地址',
    dataIndex: 'mail',
    key: 'mail',
  },
  {
    title: '提交次数',
    dataIndex: 'submit_num',
    key: 'submit_num',
  },
  {
    title: '通过次数',
    dataIndex: 'pass_num',
    key: 'pass_num',
  },

];

const Rank: React.FC = () => {
  const [data, setData] = useState<API.UserInfo[]>();
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
    GetRankList(tableParams.pagination).then((results) => {
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
    sorter: SorterResult<API.UserInfo>,
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

export default Rank;
