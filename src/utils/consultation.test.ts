import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  isValidVietnamesePhone,
  normalizeVietnamesePhoneForRequest,
  toConsultationRequest,
  validateConsultation,
  type ConsultationFormValues,
} from './consultation';

const validFormValues: ConsultationFormValues = {
  customerName: 'Nguyễn Văn A',
  phone: '0912345678',
  email: '',
  categorySlug: 'ke-toan',
  serviceId: 'a38526a9-19ed-4caa-b8e1-0ab2b1359029',
  message: '',
};

describe('Vietnamese phone validation', () => {
  for (const phone of [
    '0912345678',
    '090 123 4567',
    '090-123-4567',
    '+84912345678',
    '84912345678',
  ]) {
    it(`accepts ${phone}`, () => {
      assert.equal(isValidVietnamesePhone(phone), true);
      assert.equal(validateConsultation({ ...validFormValues, phone }).phone, undefined);
    });
  }

  for (const [label, phone] of [
    ['invalid prefix', '0212345678'],
    ['too few digits', '091234567'],
    ['too many digits', '09123456789'],
    ['letters', '09123A5678'],
    ['empty value', ''],
  ]) {
    it(`rejects ${label}`, () => {
      assert.equal(isValidVietnamesePhone(phone), false);
      assert.equal(
        validateConsultation({ ...validFormValues, phone }).phone,
        'Số điện thoại Việt Nam không hợp lệ.',
      );
    });
  }
});

describe('Vietnamese phone normalization', () => {
  it('converts supported prefixes to the local format', () => {
    assert.equal(normalizeVietnamesePhoneForRequest('+84912345678'), '0912345678');
    assert.equal(normalizeVietnamesePhoneForRequest('84912345678'), '0912345678');
    assert.equal(normalizeVietnamesePhoneForRequest('0912345678'), '0912345678');
  });

  it('sends the normalized phone in the consultation payload', () => {
    const request = toConsultationRequest({
      ...validFormValues,
      customerName: '  Nguyễn Văn A  ',
      phone: '+84 912-345.678',
    });

    assert.equal(request.phone, '0912345678');
    assert.equal(request.customerName, 'Nguyễn Văn A');
  });
});
