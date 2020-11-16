import { MockHelper } from '@go-software/shared/testing';
import { LoginComponent } from './login.component';

describe('GoLoginPage', () => {
  let component: LoginComponent;
  const mock = new MockHelper();

  describe('constructor', () => {
    it('should create the LoginPage', () => {
      component = new LoginComponent(mock.auth, mock.notification, mock.subscription);

      expect(component).toBeTruthy();
    });
  });

  describe('signInWithEmail', () => {
    beforeEach(() => resetComponent());

    it('should run signIn with the class variables', () => {
      component.email = 'test@test.com';
      component.password = 'password';

      component.signInWithEmail();

      expect(mock.auth.signInWithEmail).toHaveBeenCalledWith('test@test.com', 'password');
    });
  });

  describe('signInWithTwitter', () => {
    beforeEach(() => resetComponent());

    it('should run authService', () => {
      component.signInWithTwitter();

      expect(mock.auth.signInWithTwitter).toHaveBeenCalledTimes(1);
    });
  });

  describe('signInWithGoogle', () => {
    beforeEach(() => resetComponent());

    it('should run authService', () => {
      component.signInWithGoogle();

      expect(mock.auth.signInWithGoogle).toHaveBeenCalledTimes(1);
    });
  });

  describe('signInWithFacebook', () => {
    beforeEach(() => resetComponent());

    it('should run authService', () => {
      component.signInWithFacebook();

      expect(mock.auth.signInWithFacebook).toHaveBeenCalledTimes(1);
    });
  });

  describe('signInWithGithub', () => {
    beforeEach(() => resetComponent());

    it('should run authService', () => {
      component.signInWithGithub();

      expect(mock.auth.signInWithGithub).toHaveBeenCalledTimes(1);
    });
  });

  describe('forgotPassword', () => {
    beforeEach(() => resetComponent());

    it('should run forgotPassword with the class email', () => {
      component.email = 'test@test.com';

      component.forgotPassword();

      expect(mock.auth.forgotPassword).toHaveBeenCalledWith('test@test.com');
    });
  });

  describe('ngOnInit', () => {
    beforeEach(() => resetComponent());
  });

  function resetComponent() {
    component = new LoginComponent(mock.auth, mock.notification, mock.subscription);
  }
});
