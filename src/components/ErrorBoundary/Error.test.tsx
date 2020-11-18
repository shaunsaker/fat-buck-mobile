import React from 'react';
import { clearCache, openLink, restartApp } from '../../store/services/actions';
import { mountComponent } from '../../testUtils/mountComponent';
import { CONTACT_LINK, Error } from './Error';
import {
  pressClearCacheButton,
  pressContactSupportButton,
  pressReloadAppButton,
} from './Error.testUtils';

describe('Error', () => {
  it('calls restartApp when the reload app button is pressed', () => {
    const component = mountComponent(<Error />);

    pressReloadAppButton(component);

    expect(component.spy).toHaveBeenCalledWith(restartApp());
  });

  it('calls clearCache when the clear cache button is pressed', () => {
    const component = mountComponent(<Error />);

    pressClearCacheButton(component);

    expect(component.spy).toHaveBeenCalledWith(clearCache());
  });

  it('calls openLink when the contact support button is pressed', () => {
    const component = mountComponent(<Error />);

    pressContactSupportButton(component);

    expect(component.spy).toHaveBeenCalledWith(openLink(CONTACT_LINK));
  });
});
