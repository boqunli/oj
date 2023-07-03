import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Typography} from 'antd';
import { ProCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { Cascader } from 'antd';
const { Title, Paragraph } = Typography;

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java.js';
import 'ace-builds/src-noconflict/mode-golang.js';
import 'ace-builds/src-noconflict/mode-python.js';


import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/ext-language_tools';
import {GetProblemDetail, SubmitCode} from "@/services/oj-api/api_problem";

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'c_cpp',
    label: 'c/c++',
  },
  {
    value: 'golang',
    label: 'golang',
  },
  {
    value: 'java',
    label: 'java',
  },
  {
    value: 'python',
    label: 'python',
  },

]



const Submit: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  const [data, setData]= useState({
    id:  0,
    identity: "",
    ProblemCategories: null,
    title: "",
    content          : "null",
    max_runtime     : 0,
    max_mem         : 0,
    created_at : "",
    updated_at : "",
    deleted_at : "",
    test_cases : null,
    pass_num   : null,
    submit_num : null
  })
  const [lang, setLang] = useState("golang")
  const [code, setCode] = useState("")
  const [msg, setMsg] = useState("")
  const [pass, setPass] = useState(0)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const param = window.location.href.split("/")[window.location.href.split("/").length-1]
  const onChangeLanguage = (v: any) => {
    console.log(v)
    if (v) {
      setLang(v[0])
    }
  }

  function onEditorChange(newValue: any) {
    setCode(newValue);
  }


  useEffect(() => {
    console.log(param)
    if (param === ":id") {
      history.back()
    }
    GetProblemDetail(param).then((r)=> {
        if (r.code === 200) {
          setData(r.data)
        }
      }
    )
  }, [param])

  const onSubmit = () => {
    setIsLoading(true)
    SubmitCode({problem: param, code: code}).then((r) => {
      if (r.code === 200) {
        setMsg(r.data.msg)
        setPass(r.data.pass_num)
        setTotal(r.data.case_num)
        console.log(r.data)
      } else {
        message.error("提交失败")
      }
      setIsLoading(false)

    })
  }

  // @ts-ignore
  return (
    <>
      {/* <PageContainer > */}
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard
          title=""
          // style={{ padding: '10px' }}
          extra={
            <>
              <Button onClick={() => history.back()}>返回</Button>
            </>
          }
          split={responsive ? 'horizontal' : 'vertical'}
          bordered
          headerBordered
        >
          <ProCard colSpan="50%">
            <Title id="intro">{data.id}. {data.title}</Title>
            <Paragraph>
              <div dangerouslySetInnerHTML = {{__html: data.content}} ></div>
            </Paragraph>
          </ProCard>
          <ProCard
            wrap
            title="代码编辑"
            extra={
              <>
              <Cascader defaultValue={["golang"]} options={options} onChange ={onChangeLanguage} placeholder="请选择语言" />
              <Button
                onClick={onSubmit}
              >
                提交
              </Button>
              </>
            }
          >
            <AceEditor
              placeholder="your code here"
              mode={lang}
              theme="tomorrow"
              name="blah2"
              width="100%"
              // onLoad={this.onLoad}
              onChange={onEditorChange}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={false}
              value={code}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 4,
              }}
            />
            <Divider />
            <ProCard
              onScroll={(e) => {
                console.log(e);
              }}
              extra={<>运行结果</>}
              bordered={true}
              colSpan={24}
              loading={isLoading}
              bodyStyle={{fontSize:"15px"}}
            >
              <div className="language-bash">{msg} 通过测试用例 {pass} / {total}</div>
            </ProCard>
          </ProCard>
        </ProCard>
      </RcResizeObserver>
      {/* </PageContainer> */}
    </>
  );
};
export default Submit;
