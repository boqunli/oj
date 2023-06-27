import { ProList } from '@ant-design/pro-components';
import {Space, Tag} from 'antd';
import {GetProblemList} from "@/services/oj-api/api";
import {FC, useEffect, useState} from "react";
import { Pagination } from 'antd';
import { Input } from 'antd';
const { Search } = Input;

function DataQuery(page: number, size: number, keyword?:string) {
  const [data, setData] = useState({list:[], count: 0})
  useEffect(()=>{
    (async () => {
      const {data} = await GetProblemList({page:page, size: size, keyword: keyword});
      setData(data);
    })();
  }, []);
  return {
    data,
  };
}


function onSearch() {


}

const MyList: FC = () => {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(15)
  const {data} =  DataQuery(page, size)
  return(
    <div>
      <Space direction="horizontal">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
            <div style={{margin:"0px 20px"}}>
            <Search
              addonBefore="问题关键词"
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              style={{ width: 400 }}
            />
            </div>
            <div style={{marginLeft:"0px 20px"}}>
            <Search
              addonBefore="问题分类"
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              style={{ width: 400 }}
            /></div>
      </div>
      </Space>



      <div style={{padding:"10px"}}></div>
      <ProList<API.ProblemItem>
        onRow={(record: any) => {
          return {
            onMouseEnter: () => {
              // console.log(record);
            },
            onClick: () => {
              console.log(record);
            },
          };
        }}
        rowKey="name"
        // headerTitle="问题列表"
        // tooltip="基础列表的配置"
        dataSource={data.list}
        showActions="hover"
        showExtra="hover"
        metas={{
          title: {
            dataIndex: 'title',
            render: (_, row) => {
              return (
                <Space>问题
                  {
                    row.id
                  }: {row.title}
                </Space>
              )
            }
          },
          // avatar: {
          //   dataIndex: 'image',
          // },
          // description: {
          //   dataIndex: 'content',
          // },
          subTitle: {
            render: (_, row) => {
              return (
                <Space size={0}>
                  {
                    row.ProblemCategories?.map((item) => {
                      // console.log(item)
                      return <Tag color={"blue"} key={item.category_basic.id}>{item.category_basic.name}</Tag>
                    })
                  }
                </Space>
              );
            },
          },
          actions: {
            // render: (text, row) => [
            //
            // ],
          },
        }}
      />

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Pagination

          total={data.count}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          pageSize={size}
          current={page}
          onChange={(page, size)=> {
            setPage(page)
            setSize(size)
          }
          }
        />
      </div>
    </div>
  )
}
export default MyList;
