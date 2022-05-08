import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendEmailSpy }
);

describe('Submit feddback', () => {
  it('should not be able to submit feedback without type', async ()  => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example feedback',
      screenshot: 'data:image/png;base64,hdgfyaf',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async ()  => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,hdgfyaf',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async ()  => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example feedback',
      screenshot: 'image.jpg',
    })).rejects.toThrow();
  });

  it('should be able to submit a feedback', async ()  => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example feedback',
      screenshot: 'data:image/png;base64,hdgfyaf',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
  });
});