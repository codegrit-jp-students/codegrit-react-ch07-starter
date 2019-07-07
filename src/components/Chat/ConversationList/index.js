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

const LoadMore = () => {
  return (
    <EmptyBox/>
  )
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
    <Loader width={60} height={60} />
  </div>
);

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    const data = this.props.data;
    const Conv = data.map((item) => {
        return(
          <ConversationListItem 
            handleChooseConversation
            conversation={item}
            isChosen={item.isChosen}
          />
        )
      })
    return (
      <ConversationListWrapper>
        <Conv></Conv>
        <LoadMore/>
      </ConversationListWrapper>
    );
  }

}