import * as sinon from 'sinon';
import {Operation} from "../../src/Resources/Operation";
import {ISupportedOperation, IHydraClient, IHydraResource, IOperation, IClass} from "../../src/interfaces";

describe('Operation', () => {

    describe('constructor', () => {

        it('should require supported operation', () => {

            expect(() => new Operation(null, <IHydraClient>{}, <IHydraResource>{}))
                .toThrowError('Missing supportedOperation parameter');
            expect(() => new Operation(undefined, <IHydraClient>{}, <IHydraResource>{}))
                .toThrowError('Missing supportedOperation parameter');
        });

        it('should require alcaeus', () => {
            expect(() => new Operation(<ISupportedOperation>{}, null, <IHydraResource>{}))
                .toThrowError('Missing alcaeus parameter');
            expect(() => new Operation(<ISupportedOperation>{}, undefined, <IHydraResource>{}))
                .toThrowError('Missing alcaeus parameter');
        });

    });

    describe('property', () => {

        let operation: IOperation;
        const expects: IClass = <IClass>{};
        const returns: IClass = <IClass>{};

        beforeEach(() => {
            operation = new Operation(<ISupportedOperation>{
                method: 'POST',
                expects: expects,
                returns: returns,
                title: 'the title',
                description: 'the description'
            }, <IHydraClient>{}, <IHydraResource>{});
        });

        it('method should delegate to operation', () => {
            expect(operation.method).toBe('POST');
        });

        it('expects should delegate to operation', () => {
            expect(operation.expects).toBe(expects);
        });

        it('returns should delegate to operation', () => {
            expect(operation.returns).toBe(returns);
        });

        it('description should delegate to operation', () => {
            expect(operation.description).toBe('the description');
        });

    });

    describe('invoke', () => {

        let alcaeus;
        const supportedOperation = <ISupportedOperation>{};
        const resource = <IHydraResource>{
            id: 'http://target/resource'
        };

        beforeEach(() => alcaeus = {
            invokeOperation: sinon.stub()
        });

        it('should execute through alcaeus with JSON-LD media type', () => {

            const op = new Operation(supportedOperation, alcaeus, resource);
            const payload = {};

            op.invoke(payload);

            expect(alcaeus.invokeOperation.calledWithExactly(op, 'http://target/resource', payload, 'application/ld+json'))
                .toBeTruthy();
        });

        it('should execute through alcaeus with changed media type', () => {

            const op = new Operation(supportedOperation, alcaeus, resource);
            const payload = {};

            op.invoke(payload, 'text/turtle');

            expect(alcaeus.invokeOperation.firstCall.args[3])
                .toBeTruthy('text/turtle');
        });
    });
});