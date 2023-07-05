import React, {FC, useEffect, useState} from "react";
import {SettingOutlined } from '@ant-design/icons';
import { Descriptions } from 'antd';
import {currentUser, GetUserDetail} from "@/services/oj-api/api_user";
import { Avatar, Card } from 'antd';
import {history} from "@@/core/history";
import logo from "/public/user.jpg"
const { Meta } = Card;
const Account: FC = () => {
  const [user, setUser] = useState<API.UserInfo>()
  useEffect(() => {
    currentUser().then(r=>{
      console.log(r)
      if (r.data === undefined) {
        console.log("no data")
      } else if (r.code === -1) {
        console.log("data error")
      } else {
        GetUserDetail(r.data.username).then((r)=> {
            if (r.code === 200) {
              setUser(r.data)
            }
          }
        )
      }
    })

  }, [])

  return (
    <>
      <Card
        style={{ width: 1000, margin:"auto"}}
        cover={
          <img
            alt="example"
            src={logo}
          />
        }
        actions={[
          <SettingOutlined key="setting" onClick={()=>{
            history.push("/user/setting")}
          } />,
          // <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title= {"用户名: "+ user?.name }
          description=" "
        ></Meta>
        <div style={{height:"20px"}}></div>
        <Descriptions title="User Info" layout="vertical">
          <Descriptions.Item label="用户名">{user?.name}</Descriptions.Item>
          <Descriptions.Item label="用户唯一标识">{user?.identity}</Descriptions.Item>
          <Descriptions.Item label="家庭住址"> </Descriptions.Item>
          <Descriptions.Item label="电话号码">{user?.phone}</Descriptions.Item>
          <Descriptions.Item label="电子邮箱">{user?.mail}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{user?.created_at}</Descriptions.Item>
          <Descriptions.Item label="更新时间">{user?.updated_at}</Descriptions.Item>
          <Descriptions.Item label="提交数">{user?.submit_num}</Descriptions.Item>
          <Descriptions.Item label="通过数">{user?.pass_num}</Descriptions.Item>
          <Descriptions.Item label="其他">empty</Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  )
}
export default Account;
