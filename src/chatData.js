import moment from 'moment-timezone';
import AvatarOne from './images/avatar1.png';
import AvatarTwo from './images/avatar2.png';
import AvatarThree from './images/avatar3.png';
import AvatarFour from './images/avatar4.png';

const date1 = moment();
const date2 = moment().subtract(1, 'day');
const date3 = moment().subtract(3, 'day');
const date4 = moment().subtract(1, 'week');
const date5 = moment().subtract(1, 'month');
const date6 = moment().subtract(6, 'month');
const date7 = moment().subtract(1, 'year');

const getUnixTime = (momentObj) => momentObj.format('x')

const conversations = [
  {
    id: 1,
    user: {
      id: 2,
      avatarUrl: AvatarOne,
      name: "ジェームズ",
    },
    lastMessage: {
      sentAt: getUnixTime(date1),
      body: "こんにちは!"
    }
  },
  {
    id: 2,
    user: {
      id: 3,
      avatarUrl: AvatarThree,
      name: "ジェーン",
    },
    lastMessage: {
      sentAt: getUnixTime(date2),
      body: "こんにちは!"
    }
  },
  {
    id: 3,
    user: {
      id: 4,
      avatarUrl: AvatarTwo,
      name: "トム",
    },
    lastMessage: {
      sentAt: getUnixTime(date3),
      body: "こんにちは!"
    }
  },
  {
    id: 4,
    user: {
      id: 5,
      avatarUrl: AvatarFour,
      name: "モニカ",
    },
    lastMessage: {
      sentAt: getUnixTime(date4),
      body: "こんにちは!"
    }
  },
  {
    id: 5,
    user: {
      id: 6,
      avatarUrl: AvatarOne,
      name: "ケン",
    },
    lastMessage: {
      sentAt: getUnixTime(date5),
      body: "こんにちは!"
    }
  },
  {
    id: 6,
    user: {
      id: 7,
      avatarUrl: AvatarThree,
      name: "エイミー",
    },
    lastMessage: {
      sentAt: getUnixTime(date6),
      body: "こんにちは!"
    }
  },
  {
    id: 7,
    user: {
      id: 8,
      avatarUrl: AvatarTwo,
      name: "ジョー",
    },
    lastMessage: {
      sentAt: getUnixTime(date7),
      body: "こんにちは!"
    }
  },
]

export const fetchChatData = (page) => {
  return new Promise((resolve) => {
    const perPage = 4;
    const dataToReturn = conversations.slice(perPage * (page - 1), perPage * (page));
    setTimeout(() => {
      resolve({ 
        page,
        hasNextPage: page >= 2 ? false : true,
        conversations: dataToReturn
      });
    }, 1000)
  })
}