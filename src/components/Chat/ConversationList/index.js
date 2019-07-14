import React, { Component } from 'react';
import styled from '@emotion/styled/macro';
import ConversationListItem from '../ConversationListItem';
import { ReactComponent as Loader } from '../../../images/loading.svg';

const ConversationListWrapper = styled.ul({
  "height": "360px",
  "width": "360px",
  "overflowY": "scroll",
  "display": "flex",
  "flexDirection": "column",
  "border": "1px solid #ddd",
  "list-style": 'none',
})

// クリックされた場所のみ色を変える
const SelectedDiv = styled.div({
  // "background-color": "blue"
},({ chosenId }) => {
  console.log(chosenId)
  const styles = []
    if (chosenId) {
      styles.push({
        "background-color": 'red',
      })
    }
  }
)

const LoadMoreBox = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: 10
})

const LoadMoreMessage = styled.div({
  color: '#999',
  fontSize: '0.8em',
}, ({ hasMore }) => {
  const styles = []
  if (hasMore) {
    styles.push({
      cursor: 'pointer',
    })
  }
  return styles;
});

const LoadMore = ({
  hasNextPage,
  handleToggle,
  moreConversations,
  handleChooseConversation,
}) => {
  // hasNextPage= trueなら”更に読み込む”
  let flgNextPage = hasNextPage
  if (flgNextPage) {
    return(
      <LoadMoreBox>
        <LoadMoreMessage hasMore={flgNextPage} onClick={handleToggle}>
          更に読み込む
        </LoadMoreMessage>
      </LoadMoreBox>
    )
  }

  if (!flgNextPage) {
    const data = moreConversations
    if (data.length === 0) {
      return (
        <EmptyBox/>
      )
    }
    const conversationItem = data.map((item) => {
      // console.log(item.isChosen)
      return(
        <ConversationListItem 
          handleChooseConversation={handleChooseConversation}
          conversation={item}
          isChosen={item.isChosen}
          key={item.id}
        />
      )
    })
    return conversationItem
  }
}

const EmptyBox = () => (
  <div css={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: "360px",
    width: "360px",
    border: "1px solid #ddd",
  }}>
    <Loader width={360} height={60} />
  </div>
);

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasNextPage: this.props.hasNextPage,
      moreConversations: [],
      chosenId: this.props.chosenId,
    }
  }
  handleToggle = (e) => {
    e.preventDefault()
    // クリックされると、hasNextPageの値を現在のstateの値を反転させてセットする
    this.setState(state => ({
      hasNextPage: !state.hasNextPage
    })) 
    this.props.fetchMoreConversations().then((data)=>{
      this.setState({
        moreConversations: data
      })
    })
  }
  render() {
    const { hasNextPage, moreConversations,chosenId } = this.state
    console.log(this.state.hasNextPage)
    const data = this.props.data;
    // const handleChooseConversation = ((id) => {
    //   return this.props.handleChooseConversation(id)
    // })
    const conversationItem = data.map((item) => {
        return(
          <SelectedDiv
            chosenId={chosenId}
            key={item.id}
            onClick={()=>this.props.handleChooseConversation(item.id)}
          >
            <ConversationListItem 
              conversation={item}
              isChosen={item.isChosen}
              key={item.id}
              // onClick={()=>{console.log("test")}}
            />
          </SelectedDiv>
          
        )
      })
    return (
      <ConversationListWrapper>
        {conversationItem}
        <LoadMore 
          hasNextPage={hasNextPage} 
          handleToggle={this.handleToggle}
          moreConversations={moreConversations}
          // handleChooseConversation={handleChooseConversation}
          />
      </ConversationListWrapper>
    );
  }

}