import React, { Component } from 'react';
import { fetchChatData } from '../../chatData';
import ConversationList from './ConversationList';

export default class extends Component {
  state = {
    chosenId: 1,
    page: 1,
    hasNextPage: true,
    conversations: [],
    loadingInitial: true,
    loadingMore: false,
    isLoading:true,
  }

  handleChooseConversation = () => {}
  
  componentDidMount() {
    // fetchChatDataファンクションを利用してデータを取得しましょう。
    fetchChatData().then((data) => {
      this.setState({
        conversations: data.conversations,
        isLoading: false,
      })
    })
  }

  fetchMoreConversations = () => {
    // 2ページ目以降のデータを取得しましょう。
  }

  render() {
    const {isLoading, conversations}= this.state
    if (isLoading) return <>Loading</>
    if (!isLoading) return <ConversationList data={conversations}/>
  }
}