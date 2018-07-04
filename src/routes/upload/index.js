/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Upload from './Upload';
import Layout from '../../components/Layout';

async function action({ store, fetch }) {
  return {
    title: '上传xls表格',
    chunks: ['upload'],
    component: (
      <Layout>
        <Upload/>
      </Layout>
    ),
  };
}

export default action;
