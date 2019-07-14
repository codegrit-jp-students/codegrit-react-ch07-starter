import React, { Component } from 'react';
import { fetchChatData } from '../../chatData';
import ConversationList from './ConversationList';
import { ReactComponent as Loader } from '../../images/loading.svg';
import styled from '@emotion/styled/macro';


const LoadingWrapper = styled.div({
  "height": "360px",
  "width": "360px",
  "display": "flex",
  "alignItems": 'center',
  "justifyContent": 'center',
  "border": "1px solid #ddd",
})

export default class extends Component {
  state = {
    chosenId: 1,
    page: 1,
    hasNextPage: true,
    conversations: [],
    loadingInitial: true,
    loadingMore: false,
    moreConversations: [],
  }

  handleChooseConversation = (id) => {
    this.setState({
      chosenId: id
    })
  }
  
  async componentDidMount() {
    // fetchChatDataファンクションを利用してデータを取得しましょう。
    const chatData = await fetchChatData(1);
    console.log(chatData)
    this.setState({
      conversations: chatData.conversations,
      loadingInitial: false,
    })
  }

  fetchMoreConversations = async() => {
    // 2ページ目以降のデータを取得しましょう。
    const moreChatData =  await fetchChatData(2);
    console.log(moreChatData)
    this.setState({
      moreConversations:moreChatData.conversations
    })
    return moreChatData.conversations
  }

  render() {
    const {
      loadingInitial, 
      conversations, 
      hasNextPage, 
      moreConversations,
      chosenId,
    } = this.state

    if (loadingInitial) return <LoadingWrapper><Loader height={60}/></LoadingWrapper>
    if (!loadingInitial) {
      return (
        <ConversationList 
          data={conversations} 
          hasNextPage={hasNextPage}
          handleChooseConversation={this.handleChooseConversation}
          fetchMoreConversations={this.fetchMoreConversations}
          moreData={moreConversations}
          chosenId={chosenId}
        />
      )
    } 
  }
}