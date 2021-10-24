import Button from './components/button';
import { Tokens } from './types';

export default function components(tokens: Tokens): Tokens {
    return {
        button: Button(tokens),
    };
}
