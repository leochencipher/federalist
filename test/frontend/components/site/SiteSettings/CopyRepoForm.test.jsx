import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { CopyRepoForm } from '../../../../../frontend/components/site/SiteSettings/CopyRepoForm';

describe('<CopyRepoForm />', () => {
  const props = {
    pristine: true,
    handleSubmit: spy(),
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CopyRepoForm {...props} />);
  });

  it('displays an alert banner to the user', () => {
    expect(wrapper.find('AlertBanner').length).to.equal(1);
  });

  it('displays form fields for repo, owner, and branch, and submit button', () => {
    expect(wrapper.find('Field[name="targetOwner"]').length).to.equal(1);
    expect(wrapper.find('BranchField[name="newRepoName"]').length).to.equal(1);
    expect(wrapper.find('BranchField[name="newBaseBranch"]').length).to.equal(1);
    expect(wrapper.find('input[type="submit"]').length).to.equal(1);
  });

  it('passes its validation function to its fields', () => {
    const validator = wrapper.instance().validateInput;

    wrapper.find('Field').forEach((field) => {
      expect(field.prop('validate')[0]).to.equal(validator);
    });
  });

  it('validates Field input', () => {
    const invalidInputMsg = 'Field contains invalid characters. Please use only letters or hyphens.';
    const validator = wrapper.instance().validateInput;

    expect(validator('valid-name')).to.equal(undefined);
    expect(validator('-bad-input')).to.equal(invalidInputMsg);
    expect(validator('off@the@rails')).to.equal(invalidInputMsg);
  });

  it('disables the form if no fields have been touched', () => {
    expect(wrapper.find('input[type="submit"]').prop('disabled')).to.equal(true);
  });

  it('allows submission if the pristine prop is false', () => {
    const newProps = Object.assign({}, props, { pristine: false });
    const form = shallow(<CopyRepoForm {...newProps} />);

    expect(form.find('input[type="submit"]').prop('disabled')).to.equal(false);
  });
});
