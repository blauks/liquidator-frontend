import React from 'react';

import OutlinedButton from '../atoms/OutlinedButton';
import TransactionEntry from '../atoms/TransactionEntry';

import styled from 'styled-components';

type ITransaction = import('../../declarations/transaction').ITransaction;

interface IIncomeTransactionsProps {
  tx: Array<ITransaction>;
  className?: string;
  fetchMore: () => void;
}

const txEntry = (t: ITransaction) => (
  <TransactionEntry hideIncomeExpenseBadge={true} key={t.id} {...t} />
);

const IncomeTransactions: React.FC<IIncomeTransactionsProps> = props => {
  const renderTransactions = () =>
    props.tx
      .filter(e => e.type === 'IN')
      .sort((t1, t2) => (t2.date > t1.date ? 1 : -1))
      .map(txEntry);
  return (
    <div className={props.className}>
      <h2>Income</h2>
      {renderTransactions()}
      <OutlinedButton onClick={props.fetchMore}>Fetch more</OutlinedButton>
    </div>
  );
};

export default styled(IncomeTransactions)`
  h2 {
    margin-bottom: 1em;
  }

  button {
    display: block;
    margin: 1em auto;
  }
`;
