import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

function ErrorIconPulsing({ error, color }) {
  return (
    <span title={error} className={error ? null : 'invisible'}>
      <FaExclamationCircle className={`inline text-${color ? color : 'attentionLight'} align-baseline transition-all animate-pulse hover:text-attention`} />
    </span>
  );
}

export default ErrorIconPulsing;
