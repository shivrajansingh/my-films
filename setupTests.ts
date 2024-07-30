import { TextEncoder, TextDecoder } from 'text-encoding';
import dotenv from 'dotenv';


dotenv.config({ path: '.env' });

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
