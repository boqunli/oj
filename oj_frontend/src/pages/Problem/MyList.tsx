import { ProList } from '@ant-design/pro-components';
import {Space, Tag} from 'antd';
import {GetProblemList} from "@/services/oj-api/api_problem";
import React from "react";
import {Pagination} from 'antd';
import {Input} from 'antd';

const {Search} = Input;


// function DataQuery(page: number, size: number, keyword?: string) {
//   const [data, setData] = useState({list: [], count: 0})
//
//   useEffect(() => {
//     (async () => {
//       const {data} = await GetProblemList({page: page, size: size, keyword: keyword});
//       setData(data);
//     })();
//   }, []);
//   return {
//     data,
//   };
// }




class MyList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataSource: [],
      total: 20,
      pageSize: 15,
      pageNumber: parseInt(window.location.hash.slice(1), 0) || 1, //获取当前页面的hash值，转换为number类型
      keyword: "",
      category: "",
    };
    this.loadData = this.loadData.bind(this);
    this.onSearchKey = this.onSearchKey.bind(this);
    this.onSearchCategory = this.onSearchCategory.bind(this);
  }

  onSearchKey(k: string | undefined) {
    this.setState({
      keyword : k
    })
    this.loadData(this.state.pageNumber, this.state.pageSize, k, this.state.category).then()
    console.log(this.state.dataSource)

  }

  onSearchCategory(c: any) {
    this.setState({
      category : c
    })
    this.loadData(this.state.pageNumber, this.state.pageSize, this.state.keyword, c).then()
    console.log(this.state.dataSource)

  }

  componentDidMount() {
    this.loadData(1, 15).then()
  }

  async loadData(page: number, size: number, keyword?: string, category?: string) {
    const {data} = await GetProblemList({page: page, size: size, keyword: keyword, category: category});
    this.setState({
      dataSource: data.list,
      total: data.count
    })
  }

  render() {
    return   (
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
                placeholder="请输入关键词"
                allowClear
                onSearch={this.onSearchKey}
                style={{ width: 400 }}
              />
            </div>
            <div style={{marginLeft:"0px 20px"}}>
              <Search
                addonBefore="问题分类"
                placeholder= "请输入类别"
                allowClear
                onSearch={this.onSearchCategory}
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
          dataSource={this.state.dataSource}
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
          alignItems: 'center',
          padding: "20px"
        }}>
          <Pagination
            total={this.state.total}
            showTotal={(total: any, range: any[]) => `${range[0]}-${range[1]} of ${total} items`}
            pageSize={this.state.pageSize}
            current={this.state.pageNumber}
            onChange={(page: any, size: any)=> {
                this.loadData(page, size).then(r => {
                  console.log(r)
                })
                this.setState({
                  pageSize: size,
                  pageNumber: page
                })
              }
            }

          />
        </div>
      </div>)
  }

}
export default MyList;
