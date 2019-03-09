import { Card, Tree } from 'antd';
const { TreeNode } = Tree;

export default () => {
  const style = {
    width: '400px',
    margin: '30px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    border: '1px solid #e8e8e8',
  };

  

  return (
    <div>
      <Card style={style} actions={[<a>操作一</a>, <a>操作二</a>]}>
        <Card.Meta
          avatar={<img 
            alt=""
            style={{ width: '64px', height: '64px', borderRadius: '32px' }}
            src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"
          />}
          title="Alipay"
          description="在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。"
        />
      </Card>
      <DemoTreeView /> 
    </div>
    
  );
}

class DemoTreeView extends React.Component {
  state = {
    expandedKeys: [],
  };
  
  // 接收原本的展开事件，在 state 中记录 expandedKeys
  onExpand = (expandedKeys) => {
    this.setState({ expandedKeys });
  }
  
  // 接收选中事件，修改 expandedKeys
  onSelect = (selectedKeys) => {
    const { expandedKeys } = this.state;
    const key = selectedKeys[0];
  
    if (expandedKeys.includes(key)) {
      // 移除 key
      this.setState({
        expandedKeys: expandedKeys.filter(k => k !== key),
      });
    } else {
      // 添加 key
      this.setState({ expandedKeys: [...expandedKeys, key] });
    }
  }

  render() {
    return (
      <Tree
        expandedKeys={this.state.expandedKeys}
        selectedKeys={[]}
        onExpand={this.onExpand}
        onSelect={this.onSelect}
      >
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="leaf" key="0-0-0" />
          <TreeNode title="leaf" key="0-0-1" />
        </TreeNode>
      </Tree>
    );
  }
}