import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'By Boqun Li',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Boqun Li',
          title: 'Boqun Li',
          href: 'mailto:1905398049@qq.com',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/boqunli/oj',
          blankTarget: true,
        },
        {
          key: 'mail',
          title: '1905398049@qq.com',
          href: 'mailto:1905398049@qq.com',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
