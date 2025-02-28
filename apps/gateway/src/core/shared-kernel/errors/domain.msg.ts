import { SocialLinkType } from '../../../shared/enums';

export const DomainMessages = {
  User: {
    PhotoExists: 'A photo already exists for this user.',
    PhotoNonExist: 'There is no photo to delete for this user.',
    SocialLinkNotFound: 'Social link not found.',
    SocialLinkAlreadyExists: (type: SocialLinkType) =>
      `A social link of type ${type} already exists.`,
  },
  SocialLink: {
    InvalidUrl: (type: SocialLinkType) =>
      `The provided URL does not match the expected format ${type}.`,
    ValidationRuleNotDefined: (type: SocialLinkType) =>
      `Validation rule for the specified social link type ${type} is not defined.`,
  },
};
