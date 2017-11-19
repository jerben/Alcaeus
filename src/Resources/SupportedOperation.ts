import {IClass} from "../interfaces";
import {Core} from "../Constants";
import {owl} from "../Vocabs";
import {Constructor} from "./Mixin";

export default <TBase extends Constructor>(Base: TBase) => {
    return class extends Base {

        get method(): string {
            return this[Core.Vocab.method];
        }

        get expects(): IClass {
            return this[Core.Vocab.expects];
        }

        get returns(): IClass {
            return this[Core.Vocab.returns];
        }

        get requiresInput(): boolean {
            const method = this.method || '';
            const methodExpectsBody = method.toUpperCase() !== 'GET' && this.method.toUpperCase() !== 'DELETE';

            const operationExpectsBody = !!this.expects && this.expects.id !== owl.Nothing;

            return methodExpectsBody || operationExpectsBody;
        }
    };
};
