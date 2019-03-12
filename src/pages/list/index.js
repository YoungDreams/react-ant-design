import React from 'react';
import { Table, Modal, Button, Form, Input } from 'antd';
import { connect } from 'dva';
import SampleChart from '../../components/SampleChart';

const FormItem = Form.Item;

const namespace = 'cards';

const mapDispatchToProps = (dispatch) => {
  return {
    onDidMount: () => {
      dispatch({
        type: getURI('queryList')
      });
    },
    consoleLog: () => {
      console.log('mapDispatchToProps');
    }
  };
};

const getURI = (uri) => {
  return `${namespace}/${uri}`;
}

class List extends React.Component {
    componentDidMount() {
      this.props.dispatch({
        type: getURI('queryList'),
      });
    }

    state = {
      visible: false,
      statisticVisible: false,
      id: null,
    };  

    columns = [
        {
          title: '名称',
          dataIndex: 'name',
        },
        {
          title: '描述',
          dataIndex: 'desc',
        },
        {
          title: '链接',
          dataIndex: 'url',
          render: value => <a href={value}>{value}</a>,
        },
        {
          title: '',
          dataIndex: 'statistic',
          render: (_, { id }) => {
            return (
              <Button onClick={() => { this.showStatistic(id); }}>图表</Button>
            );
          },
        },
    ];

    showStatistic = (id) => {
      this.props.dispatch({
        type: getURI('getStatistic'),
        payload: id,
      });
      // 更新 state，弹出包含图表的对话框
      this.setState({ id, statisticVisible: true });
    };

    handleStatisticCancel = () => {
      this.setState({
        statisticVisible: false,
      });
    }

    showModal = () => {
      this.setState({ visible: true });
    };

    closeModal = () => {
      this.setState({ visible: false });
    };

    handleOk = () => {
      const { dispatch, form: { validateFields } } = this.props;

      validateFields(
        (err, values) => {
          if (!err) {
            dispatch({
              type: getURI('addOne'),
              payload: values,
            });
            this.setState({visible: false});
          }
        }
      );
    }

    render() {
        const { cardsList, cardsLoading, statistic } = this.props;
        const { visible, statisticVisible, id } = this.state;
        const { form: { getFieldDecorator } } = this.props;
        return (
            <div>
                <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id">
                </Table>
                <Button onClick={this.showModal}>新建</Button>
                <Modal 
                  title="新建记录"
                  visible={visible}
                  onCancel={this.closeModal}
                  onOk={this.handleOk}
                  >
                  <Form>
                    <FormItem label="名称">
                      {getFieldDecorator('name', {
                        rules: [{ required: true }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label="描述">
                      {getFieldDecorator('desc')(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label="链接">
                      {getFieldDecorator('url', {
                        rules: [{ type: 'url' }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                  </Form>
                </Modal>

                <Modal visible={statisticVisible} footer={null} onCancel={this.handleStatisticCancel}>
                  <SampleChart data={statistic[id]} />
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
      cardsList: state.cards.cardsList,
      cardsLoading: state.loading.effects['cards/queryList'],
      statistic: state.cards.statistic,
  };
}

export default connect(mapStateToProps)(Form.create()(List));