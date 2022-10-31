// Navigation
/**
 * NOTE
 * We needs RootTabParamList to resolve typescript error
 * when using navigation.navigate()
 *
 * <example for RootTabParamList>
 *
 * Home: undefined;
 * Profile: { userId: string };
 * Feed: { sort: 'latest' | 'top' } | undefined;
 *
 * <How to use RootTabParamList>
 */

export type RootStackParamList = {
  Home: undefined;
  Map: undefined;
  Chat: undefined;
  Profile: undefined;
  CreatePheed: undefined;
  EditProfile: undefined;
  EditProfileItem: {editProfileMode: EditProfileType};
  Wallet: undefined;
  Alarm: undefined;
  MainPheed: undefined;
  MainMap: undefined;
  MainChat: undefined;
  MainProfile: undefined;
  ProfileDetail: undefined;
  DetailPheed: PheedDetailParamList;
};

// Pheed
export type PheedDetailParamList = {
  name: string | undefined;
  profileImg: string | undefined;
  datetime: string | undefined;
  location: string;
  title: string | undefined;
  content: string | undefined;
  comment: number | undefined;
  comments: Array<CommentParamList>;
  like: number | undefined;
  isLive: boolean | undefined;
  imgUrl: string[] | undefined;
};

export type CommentParamList = {
  content: string;
  pheedId: string;
  time: string;
  userId: string;
};

// Map

// Chat

// Profile
export type EditProfileType =
  | 'nickname'
  | 'introduction'
  | 'bank'
  | 'account'
  | 'holder';
