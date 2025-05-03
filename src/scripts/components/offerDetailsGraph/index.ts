import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import offerDetailsGraphPopupTemplate from  "../../components/offerDetailsGraphPopup/template.precompiled.js"

interface PriceData {
    date: string;
    price: number;
}

interface Config {
    PADDING: number;
    CHART_HEIGHT: number;
    CHART_WIDTH: number;
    STEP_X: number;
    POINT_RADIUS: number;
}

export default class OfferDetailsGraph extends BaseComponent {
    private canvas: HTMLCanvasElement | null;
    private config: Config | undefined;
    private data: PriceData[] | undefined;
    private prices: number[] = [];
    private context: CanvasRenderingContext2D | null;
    private popup: HTMLElement | null = null;
    private hoveredPointIndex: number | null = null;
    private hoveredChart = false;

    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});

        this.canvas = document.getElementById('offerDetailsCanvas') as HTMLCanvasElement;

        const dpr = window.devicePixelRatio || 1; // Плотность пикселей экрана.
        // Ставим физический размер canvas для изображения без шероховатостей.
        const cssWidth = this.canvas.offsetWidth;
        const cssHeight = this.canvas.offsetHeight;
        this.canvas.width = cssWidth * dpr;
        this.canvas.height = cssHeight * dpr;

        // Получение контекста и масштабирование
        this.context = this.canvas.getContext('2d');
        if (!this.context) {
            return;
        }
        this.context.scale(dpr, dpr);

        this.data = [
            { date: '1 апреля', price: 600000 },
            { date: '5 апреля', price: 650000 },
            { date: '12 апреля', price: 570000 },
        ];

        this.prices = this.data.map(p => p.price);
        this.config = this.createConfig(cssWidth, cssHeight);
        this.popup = document.getElementById("offerDetailsGraphPopup");

        this.drawChart();

        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }

    handleMouseLeave() {
        this.hoveredPointIndex = null;
        this.hoveredChart = false;
        this.drawChart();
    }
    handleMouseMove(event: MouseEvent) {
        if (!this.canvas || !this.config || !this.data) {
            return;
        }

        // Наведен ли курсор на область графика
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const chartLeft = 0;
        const chartRight = this.canvas.offsetWidth;
        const chartTop = 0;
        const chartBottom = this.canvas.offsetHeight;

        this.hoveredChart = mouseX >= chartLeft && mouseX <= chartRight && mouseY >= chartTop && mouseY <= chartBottom;

        this.hoveredPointIndex = null;

        // Наведен ли курсор на какую-то точку
        for (let i = 0; i < this.data.length; i++) {
            const point = this.data[i];
            const x = this.config.PADDING + i * this.config.STEP_X;
            const y = this.priceToY(point.price);
            if (!y) {
                return;
            }
            const dx = mouseX - x;
            const dy = mouseY - y;
            const distSq = dx * dx + dy * dy;
            if (distSq <= this.config.POINT_RADIUS * this.config.POINT_RADIUS * 4) {
                this.hoveredPointIndex = i;
                break;
            }
        }

        this.drawChart();
    }

    createConfig(width: number, height: number) {
        if (!this.data) {
            return;
        }
        const PADDING = 60;
        const CHART_HEIGHT = height - PADDING * 2;
        const CHART_WIDTH = width - PADDING * 2;
        const STEP_X = this.data.length > 1 ? CHART_WIDTH / (this.data.length - 1) : 0;
        const POINT_RADIUS = 6;

        return {
            PADDING,
            CHART_HEIGHT,
            CHART_WIDTH,
            STEP_X,
            POINT_RADIUS,
        };
    }

    // Перевод цены в координату Y
    priceToY(price: number) {
        if (!this.config) {
            return;
        }
        const minPrice = Math.min(...this.prices);
        const maxPrice = Math.max(...this.prices);
        if (maxPrice === minPrice) {
            // Центрируем единственную точку по вертикали
            return this.config.PADDING + this.config.CHART_HEIGHT / 2;
        }
        return this.config.PADDING + this.config.CHART_HEIGHT * (1 - (price - minPrice) / (maxPrice - minPrice));
    }

    drawChart() {
        if (!this.canvas || !this.context){
            return;
        }

        this.context.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
        this.context.font = '14px sans-serif';

        this.drawAxes();

        this.context.fillStyle = '#000';
        this.context.textAlign = 'center';

        this.writeDates();

        this.context.textAlign = 'right';

        this.writePrices();

        this.drawArea();

        this.drawMainLine();

        this.hoverPoints();

        this.handlePopup();

    }

    drawAxes() {
        if (!this.canvas || !this.context || !this.config) {
            return;
        }

        this.context.beginPath();
        this.context.moveTo(this.config.PADDING, this.config.PADDING); // Начальная точка (левый верх)
        this.context.lineTo(this.config.PADDING, this.canvas.offsetHeight - this.config.PADDING); // Y-ось (вниз)
        this.context.lineTo(this.canvas.offsetWidth - this.config.PADDING, this.canvas.offsetHeight - this.config.PADDING); // X-ось (вправо)
        this.context.strokeStyle = '#000';
        this.context.lineWidth = 2;
        this.context.stroke(); // Отрисовка
    }

    writeDates() {
        if (!this.config || !this.data) {
            return;
        }
        this.data.forEach((point, i) => {
            if (!this.canvas || !this.context || !this.config) {
                return;
            }
            const x = this.config.PADDING + i * this.config.STEP_X;
            this.context.fillText(point.date, x, this.canvas.offsetHeight - this.config.PADDING + 20);
        });
    }

    writePrices() {
        if (!this.context) {
            return;
        }
        const minPrice = Math.min(...this.prices);
        const maxPrice = Math.max(...this.prices);
        for (let i = 0; i <= 5; i++) {
            const value = minPrice + i * (maxPrice - minPrice) / 5; // 5 равномерных цен по оси Y
            const y = this.priceToY(value);
            if (!y || !this.config) {
                return;
            }
            this.context.fillText(Math.round(value).toString(), this.config.PADDING - 10, y + 5);
        }
    }

    drawArea() {
        if (!this.canvas || !this.context || !this.data || !this.config) {
            return;
        }
        this.context.beginPath();
        if (this.data.length === 1) {
            // Отрисовка горизонтальной линии для одной точки
            this.drawHorizontalPath();
            this.context.lineTo(this.config.PADDING + this.config.CHART_WIDTH, this.canvas.offsetHeight - this.config.PADDING);
            this.context.lineTo(this.config.PADDING, this.canvas.offsetHeight - this.config.PADDING);
        } else {
            this.drawLinePath();
            this.context.lineTo(this.config.PADDING + (this.data.length - 1) * this.config.STEP_X, this.canvas.offsetHeight - this.config.PADDING);
            this.context.lineTo(this.config.PADDING, this.canvas.offsetHeight - this.config.PADDING);
        }

        this.context.closePath();
        this.context.fillStyle = 'rgba(100, 149, 237, 0.2)';
        this.context.fill();
    }

    drawMainLine() {
        if (!this.context || !this.data) {
            return;
        }
        this.context.beginPath();
        if (this.data.length === 1) {
            this.drawHorizontalPath();
        } else {
            this.drawLinePath();
        }

        this.context.strokeStyle = '#3b82f6';
        this.context.lineWidth = this.hoveredChart ? 3 : 2;
        this.context.stroke();
    }

    drawLinePath() {
        if (!this.data) {
            return;
        }
        this.data.forEach((point, i) => {
            if (!this.context || !this.config) {
                return;
            }
            const x = this.config.PADDING + i * this.config.STEP_X;
            const y = this.priceToY(point.price);
            if (!y) {
                return;
            }
            if (i === 0) this.context.moveTo(x, y);
            else this.context.lineTo(x, y);
        });
    }

    drawHorizontalPath() {
        // Отрисовка горизонтальной линии для одной точки
        if (!this.config || !this.data || !this.context) {
            return;
        }
        const y = this.priceToY(this.data[0].price);
        if (!y) {
            return;
        }
        this.context.moveTo(this.config.PADDING, y);
        this.context.lineTo(this.config.PADDING + this.config.CHART_WIDTH, y);
    }

    handlePopup() {
        if (!this.canvas || !this.data || !this.config) {
            return;
        }
        if (this.hoveredPointIndex !== null && this.popup) {
            const point = this.data[this.hoveredPointIndex];
            const x = this.config.PADDING + this.hoveredPointIndex * this.config.STEP_X;
            const y = this.priceToY(point.price);
            if (!y) {
                return;
            }

            let percentText = '—';
            let arrowClass = '';

            if (this.hoveredPointIndex > 0) {
                const prev = this.data[this.hoveredPointIndex - 1].price;
                const percent = ((point.price - prev) / prev) * 100;
                arrowClass = percent > 0 ? 'arrow-up' : 'arrow-down';
                percentText = `${Math.abs(percent).toFixed(1)}%`;
            }

            this.popup.innerHTML = offerDetailsGraphPopupTemplate({
                price: point.price.toLocaleString('ru-RU') + ' ₽',
                percent: percentText,
                arrowClass,
            });

            this.popup.style.left = `${x+10}px`;
            this.popup.style.top = `${y-10}px`;
            this.popup.style.transform = 'translate(-50%, -100%)';
            this.popup.style.position = 'absolute';
            this.popup.style.display = 'block';
        } else if (this.popup) {
            this.popup.style.display = 'none';
        }
    }

    hoverPoints() {
        if (this.hoveredChart && this.data) {
            this.data.forEach((point, i) => {
                if (!this.context || !this.config) {
                    return;
                }

                const x = this.config.PADDING + i * this.config.STEP_X;
                const y = this.priceToY(point.price);
                if (!y) {
                    return;
                }
                this.context.beginPath();
                this.context.arc(x, y, this.config.POINT_RADIUS, 0, Math.PI * 2); // Круг
                this.context.fillStyle = (i === this.hoveredPointIndex) ? '#3b82f6' : '#90caf9';
                this.context.fill();
                this.context.strokeStyle = '#fff';
                this.context.stroke();
            });
        }
    }

    destroy() {
        if (this.canvas) {
            this.canvas.removeEventListener('mousemove', this.handleMouseMove.bind(this));
            this.canvas.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));
        }
    }
}