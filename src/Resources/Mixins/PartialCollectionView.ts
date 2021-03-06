import {nonenumerable} from 'core-decorators';
import {Core} from '../../Constants';
import {IAsObject, IIncomingLink} from '../../internals';
import {IPartialCollectionView, IView} from '../index';
import {Constructor} from '../Mixin';
import {IResource} from '../Resource';

export function Mixin<TBase extends Constructor>(Base: TBase) {
    class PartialCollectionView extends Base implements IPartialCollectionView, IView {
        @nonenumerable
        get first() {
            return this[Core.Vocab('first')] || null;
        }

        @nonenumerable
        get previous() {
            return this[Core.Vocab('previous')] || null;
        }

        @nonenumerable
        get next() {
            return this[Core.Vocab('next')] || null;
        }

        @nonenumerable
        get last() {
            return this[Core.Vocab('last')] || null;
        }

        @nonenumerable
        get collection() {
            const reverseLinks = (this as any as IAsObject)._links;
            const collectionLink = reverseLinks.find((linkArray: IIncomingLink) => {
                return linkArray.predicate === Core.Vocab('view');
            });

            return collectionLink ? collectionLink.subject : null;
        }
    }

    return PartialCollectionView;
}

export const shouldApply = (res: IResource) => res.types.contains(Core.Vocab('PartialCollectionView'));
