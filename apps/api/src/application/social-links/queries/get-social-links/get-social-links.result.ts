import { SocialLink } from '$core/user-aggregate/social-link.model';

export class GetSocialLinksResult {
  constructor(public readonly socialLinks: SocialLink[] = []) {}
}
