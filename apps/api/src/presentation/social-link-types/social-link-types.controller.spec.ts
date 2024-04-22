import { Test, TestingModule } from '@nestjs/testing';
import { SocialLinkTypesController } from './social-link-types.controller';

describe('SocialLinkTypesController', () => {
  let controller: SocialLinkTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialLinkTypesController],
    }).compile();

    controller = module.get<SocialLinkTypesController>(SocialLinkTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
