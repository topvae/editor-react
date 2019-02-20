import React from 'react';
import {Card, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//转化为html
import draftToHtml from 'draftjs-to-html';
export default class App extends React.Component{
  state={
    showRichText:false
  }
  //获取编译器的状态
  onEditorStateChange =(editorState)=> {
    this.setState({
      editorState
    })
  }
  //内容改变的时候
  onEditChange =(contentState)=> {
    this.setState({
      contentState,
    })
  }
  //清空内容
  handleClearContent =()=> {
    this.setState({
      editorState:""
    })
  }
  //获取HTML标签
  handleGetText =()=> {
    this.setState({
      showRichText:true
    })
  }

  render(){
    const { editorState } = this.state;
    return(
      <div>
        <Card>
           <Button type="primary" onClick={this.handleClearContent} style={{marginRight:'10px'}}>清空内容</Button>
           <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
        </Card>
        <Card title="富文本编辑器">
          <Editor
            editorState={editorState}
            onContentStateChange = {this.onEditChange}  //获取内容变化的时候
            onEditorStateChange={this.onEditorStateChange} //编译器状态的变化
          />
        </Card>
        <Modal
          title='富文本'
          visible={this.state.showRichText}
          onCancel={()=>{
            this.setState({
              showRichText:false
            })
          }}
          footer={null}
        >
            {draftToHtml(
              this.state.contentState
          )}
        </Modal>
      </div>
    )
  }
}