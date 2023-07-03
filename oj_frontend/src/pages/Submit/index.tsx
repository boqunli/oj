import React, {useEffect, useState} from 'react';
import { Button, Divider, Typography } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';

const { Title, Paragraph, Text } = Typography;

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import {GetProblemDetail} from "@/services/oj-api/api_problem";

function onEditorChange(newValue: any) {
  console.log('change', newValue);
}

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

  useEffect(() => {
    const param = window.location.href.split("/")[window.location.href.split("/").length-1]
    console.log(param)
    GetProblemDetail(param).then((r)=> {
      console.log(r)
        if (r.code === 200) {
          setData(r.data)
        }
      }
    )
  }, [])

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
              {data.content}
            </Paragraph>

            {/*<Title level={3}>示例1</Title>*/}
            {/*<Paragraph>*/}
            {/*  <Text code>*/}
            {/*    输入：s = &quot;aa&quot;, p = &quot;a&quot; 输出：false 解释：&quot;a&quot; 无法匹配*/}
            {/*    &quot;aa&quot; 整个字符串。*/}
            {/*  </Text>*/}
            {/*</Paragraph>*/}
            {/*<Title level={3}>示例2</Title>*/}
            {/*<Paragraph>*/}
            {/*  <Text code>*/}
            {/*    输入：s = &quot;aa&quot;, p = &quot;a&quot; 输出：false 解释：&quot;a&quot; 无法匹配*/}
            {/*    &quot;aa&quot; 整个字符串。*/}
            {/*  </Text>*/}
            {/*</Paragraph>*/}
            {/*<Title level={3}>提示</Title>*/}

            {/*<Paragraph>*/}
            {/*  <ul>*/}
            {/*    <li>1 &lt;= s.length &lt;= 20</li>*/}
            {/*    <li>1 &lt;= s.length &lt;= 20</li>*/}
            {/*    <li>s 只包含从 a-z 的小写字母</li>*/}
            {/*    <li>p 只包含从 a-z 的小写字母，以及字符 . 和 *。</li>*/}
            {/*    <li>保证每次出现字符 * 时，前面都匹配到有效的字符</li>*/}
            {/*  </ul>*/}
            {/*</Paragraph>*/}
            {/*<Title level={3}>参考资料</Title>*/}
            {/*<Paragraph>*/}
            {/*  <ul>*/}
            {/*    <li>*/}
            {/*      <a href="/docs/spec/proximity">资料1</a>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*      <a href="/docs/pattern/navigation">资料2</a>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*      <a href="/docs/resource/download">资料3</a>*/}
            {/*    </li>*/}
            {/*  </ul>*/}
            {/*</Paragraph>*/}
          </ProCard>
          <ProCard
            wrap
            title="代码编辑"
            extra={
              <Button
                onClick={(e) => {
                  console.log(e.target);
                }}
              >
                提交
              </Button>
            }
          >
            <AceEditor
              placeholder="Placeholder Text"
              mode="go"
              theme="github"
              name="blah2"
              width="100%"
              // onLoad={this.onLoad}
              onChange={onEditorChange}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={false}
              value={` `}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
            <Divider />
            <ProCard
              onScroll={(e) => {
                console.log(e);
              }}
              extra={<>运行结果</>}
              bordered
              colSpan={24}
            >
              <pre className="language-bash">ok</pre>
            </ProCard>
          </ProCard>
        </ProCard>
      </RcResizeObserver>
      {/* </PageContainer> */}
    </>
  );
};
export default Submit;
