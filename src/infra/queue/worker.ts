import 'dotenv/config';
import BullProvider from '@infra/providers/Queue/implementations/BullProvider';

const bullProvider = new BullProvider();

bullProvider.process();
