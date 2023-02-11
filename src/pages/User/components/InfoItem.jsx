import React from 'react';
import { Row, Col } from 'antd';
export default function InfoItem({ name, info }) {
  return (
    <div>
      <Row
        justify="center"
        align="center"
        style={{
          marginBottom: '5px',
        }}
      >
        <Col span={12}>{name + ' :'}</Col>
        <Col span={12}>{info ? info : '未填写'}</Col>
      </Row>
    </div>
  );
}
