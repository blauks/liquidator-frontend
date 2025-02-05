import React from 'react';
import styled from 'styled-components';

import { useTransactionState } from '../../store/contexts/transactions';
import AddTransaction from '../molecules/AddTransaction';
import ExpenseTransactions from '../molecules/ExpenseTransactions';
import Filters from '../molecules/Filters';
import IncomeTransactions from '../molecules/IncomeTransactions';
import TransactionCalculator from '../molecules/TransactionCalculator';

type ITransaction = import('../../declarations/transaction').ITransaction;

const Content = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 3em 4em;
  width: calc(100% - 4em);
  margin-top: 2em;
`;

const Transactions: React.FC<{ className?: string }> = ({ className }) => {
  const store = useTransactionState();

  const [filter, setFilter] = React.useState<(t: ITransaction) => boolean>(
    () => (t: ITransaction) => true
  );

  return (
    <div className={className}>
      <div>
        <h1>Transactions</h1>
        <h5>Showing all transactions</h5>
        <Content>
          <AddTransaction />
          <Filters setFilter={setFilter} />

          <div>
            <IncomeTransactions
              tx={store.transactions.filter(filter)}
              fetchMore={alert}
            />
          </div>

          <div>
            <ExpenseTransactions
              tx={store.transactions.filter(filter)}
              fetchMore={alert}
            />
          </div>
        </Content>
      </div>
      <TransactionCalculator />
    </div>
  );
};

export default styled(Transactions)`
  display: grid;

  grid-template-columns: calc(70% - 2em) calc(30% - 2em);
  grid-gap: 4em;
`;
