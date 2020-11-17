import { EditWallet, EditWalletProps } from '.';
import { mountComponent } from '../../testUtils/mountComponent';

export const mountEditWallet = ({ props }: { props: EditWalletProps }) => {
  const { getByText, getByPlaceholderText, queryByText, spy } = mountComponent(
    <EditWallet {...props} />,
  );
};
