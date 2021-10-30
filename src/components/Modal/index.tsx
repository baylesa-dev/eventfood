import {
    useEffect,
    Fragment,
    ReactElement,
    PropsWithChildren,
    useState,
} from 'react';

import { useSpring, config } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import * as S from './styles';

export type ModalProps = {
    open: boolean;
    onClose: () => void;
};

export default function Modal({
    open,
    onClose,
    children,
}: PropsWithChildren<ModalProps>): ReactElement {
    const height =
        typeof window !== 'undefined' ? (window.innerHeight * 90) / 100 : 480;
    const body =
        typeof window !== 'undefined'
            ? document.querySelector('body')
            : undefined;
    const [{ y }, set] = useSpring(() => ({ y: height }));

    const openIt = ({ canceled }: { canceled?: boolean }) => {
        set({
            y: 0,
            immediate: false,
            config: canceled ? config.wobbly : config.stiff,
        });
    };

    const closeIt = (velocity = 0) => {
        set({
            y: height,
            immediate: false,
            config: { ...config.stiff, velocity },
        });
    };

    const bind = useDrag(
        ({ event, last, movement: [, my], canceled, intentional }) => {
            event.stopPropagation();

            if (my <= 0 || !intentional) {
                return;
            }

            if (last) {
                if (my > height / 4) {
                    closeIt();
                    onClose();
                } else {
                    openIt({ canceled });
                }
            } else {
                set({ y: my, immediate: true });
            }
        },
        {
            initial: () => [0, y.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true,
            threshold: 30,
            useTouch: true,
        }
    );

    const display = y.to((py) => (py < height ? 'block' : 'none'));

    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
        if (open) {
            if (body) {
                setScrollPosition(window.pageYOffset);
                body.style.overflow = 'hidden';
                body.style.position = 'fixed';
                body.style.top = `-${scrollPosition}px`;
                body.style.width = '100%';
                body.style.touchAction = 'none';
            }
            openIt({ canceled: undefined });
        } else if (body) {
            body.style.touchAction = 'initial';
            body.style.removeProperty('overflow');
            body.style.removeProperty('position');
            body.style.removeProperty('top');
            body.style.removeProperty('width');
            window.scrollTo(0, scrollPosition);
        }
    }, [open]);

    return (
        <Fragment>
            <S.Overlay open={open} onClick={() => onClose()} />
            <S.Container
                role="dialog"
                {...bind()}
                style={{
                    display,
                    bottom: open ? 0 : '-100%',
                    y,
                }}>
                <S.Wrapper>{children}</S.Wrapper>
            </S.Container>
        </Fragment>
    );
}
