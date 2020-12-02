import { MessagingTopics } from '../messaging/models';
import { ApplicationState } from '../reducers';

export const selectMessageTopicEnabled = (
  state: ApplicationState,
  topic: MessagingTopics,
) => state.settings.messaging[topic];
