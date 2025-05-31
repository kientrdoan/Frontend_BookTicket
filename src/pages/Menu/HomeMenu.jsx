import React, { Fragment } from 'react';
import { Tabs, Radio, Space } from 'antd';
// import { connect } from 'react-redux';
const { TabPane } = Tabs;

export default class HomeMenu extends React.PureComponent {


    state = {
        tabPosition: 'left',
    };

    changeTabPosition = e => {
        this.setState({ tabPosition: e.target.value });
    };
    componentDidMount() {

    }
    render() {
        const { tabPosition } = this.state;
        return (
        <>
            <Tabs tabPosition={tabPosition}>
            <TabPane tab="Tab 1" key="1">
                Content of Tab 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
                Content of Tab 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
                Content of Tab 3
            </TabPane>
            </Tabs>
        </>
        );
  }
}