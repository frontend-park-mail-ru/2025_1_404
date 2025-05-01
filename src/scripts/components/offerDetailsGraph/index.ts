import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";

type PriceData = {
    date: string;
    price: number;
};

type Config = {
    PADDING: number;
    WIDTH: number;
    HEIGHT: number;
    CHART_HEIGHT: number;
    CHART_WIDTH: number;
    STEP_X: number;
    POINT_RADIUS: number;
};


const data: PriceData[] = [
    { date: '1 апреля', price: 600000 },
    { date: '3 апреля', price: 580000 },
    { date: '10 апреля', price: 520000 },
    { date: '11 апреля', price: 540000 },
    { date: '28 апреля', price: 510000 }
];

/**
 * @class OfferDetailsGraph
 * @description Компонент карусели фотографий с превью.
 * @augments BaseComponent
 */
export default class OfferDetailsGraph extends BaseComponent {
    private canvas: HTMLCanvasElement | null;
    private config: Config;
    private data: PriceData[];
    private prices: number[] = [];
    private context: CanvasRenderingContext2D | null;
    private hoveredIndex: number | null = null;
    private hoveredOverChart = false;

    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});

        this.canvas = document.getElementById('offerDetailsCanvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
        this.data = data;
        this.config = this.createConfig();
        this.prices = data.map(p => p.price);

        this.drawChart();

        this.canvas.addEventListener('mousemove', (event) => {
            if (!this.canvas) {
                return null;
            }
            const rect = this.canvas.getBoundingClientRect();
            const mx = event.clientX - rect.left;
            const my = event.clientY - rect.top;

            this.hoveredOverChart = mx > this.config.PADDING && mx < this.canvas.width - this.config.PADDING &&
                my > this.config.PADDING && my < this.canvas.height - this.config.PADDING;

            this.hoveredIndex = null;
            data.forEach((point, i) => {
                const x = this.config.PADDING + i * this.config.STEP_X;
                const y = this.priceToY(point.price);
                const dx = mx - x;
                const dy = my - y;
                if (dx * dx + dy * dy <= this.config.POINT_RADIUS * this.config.POINT_RADIUS * 4) {
                    this.hoveredIndex = i;
                }
            });

            this.drawChart();
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.hoveredIndex = null;
            this.hoveredOverChart = false;
            this.drawChart();
        });
    }

    createConfig() {
        const PADDING = 60;
        const WIDTH = 400;
        const HEIGHT = 400;
        const CHART_HEIGHT = HEIGHT - PADDING * 2;
        const CHART_WIDTH = WIDTH - PADDING * 2;
        const STEP_X = CHART_WIDTH / (this.data.length - 1);
        const POINT_RADIUS = 6;

        return {
            PADDING,
            WIDTH,
            HEIGHT,
            CHART_HEIGHT,
            CHART_WIDTH,
            STEP_X,
            POINT_RADIUS,
        };
    }

    priceToY(price: number) {
        const minPrice = Math.min(...this.prices);
        const maxPrice = Math.max(...this.prices);
        return this.config.PADDING + this.config.CHART_HEIGHT * (1 - (price - minPrice) / (maxPrice - minPrice));
    }

    drawChart() {
        if (!this.canvas) {
            return null;
        }
        const context = this.canvas.getContext('2d');
        if (!context) {
            return null;
        }
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.font = '14px sans-serif';

        // Оси
        context.beginPath();
        context.moveTo(this.config.PADDING, this.config.PADDING);
        context.lineTo(this.config.PADDING, this.canvas.height - this.config.PADDING);
        context.lineTo(this.canvas.width - this.config.PADDING, this.canvas.height - this.config.PADDING);
        context.strokeStyle = '#000';
        context.lineWidth = this.hoveredIndex !== null ? 1 : 2;
        context.stroke();

        // Подписи по X
        context.fillStyle = '#000';
        context.textAlign = 'center';
        data.forEach((point, i) => {
            if (!this.canvas) {
                return null;
            }
            const x = this.config.PADDING + i * this.config.STEP_X;
            context.fillText(point.date, x, this.canvas.height - this.config.PADDING + 20);
        });

        // Подписи по Y
        context.textAlign = 'right';
        const minPrice = Math.min(...this.prices);
        const maxPrice = Math.max(...this.prices);
        for (let i = 0; i <= 5; i++) {
            const value = minPrice + i * (maxPrice - minPrice) / 5;
            const y = this.priceToY(value);
            context.fillText(Math.round(value).toString(), this.config.PADDING - 10, y + 5);
        }

        // Заливка под линией
        context.beginPath();
        data.forEach((point, i) => {
            const x = this.config.PADDING + i * this.config.STEP_X;
            const y = this.priceToY(point.price);
            if (i === 0) context.moveTo(x, y);
            else context.lineTo(x, y);
        });
        context.lineTo(this.config.PADDING + (data.length - 1) * this.config.STEP_X, this.canvas.height - this.config.PADDING);
        context.lineTo(this.config.PADDING, this.canvas.height - this.config.PADDING);
        context.closePath();
        context.fillStyle = 'rgba(100, 149, 237, 0.2)';
        context.fill();

        // Линия графика
        context.beginPath();
        data.forEach((point, i) => {
            const x = this.config.PADDING + i * this.config.STEP_X;
            const y = this.priceToY(point.price);
            if (i === 0) context.moveTo(x, y);
            else context.lineTo(x, y);
        });
        context.strokeStyle = '#3b82f6';
        context.lineWidth = this.hoveredOverChart ? 3 : 2;
        context.stroke();

        this.hoverPoints(context);

        // Всплывашка
        if (this.hoveredIndex !== null) {
            const point = data[this.hoveredIndex];
            const x = this.config.PADDING + this.hoveredIndex * this.config.STEP_X;
            const y = this.priceToY(point.price);

            // Разница
            let diffText = '—';
            let arrow = '';
            let color = '#555';
            if (this.hoveredIndex > 0) {
                const prev = data[this.hoveredIndex - 1].price;
                const diff = ((point.price - prev) / prev) * 100;
                arrow = diff > 0 ? '↑' : (diff < 0 ? '↓' : '→');
                color = diff > 0 ? 'red' : (diff < 0 ? 'green' : '#555');
                diffText = `${arrow} ${Math.abs(diff).toFixed(1)}%`;
            }

            // Всплывашка
            const lines = [
                point.price.toLocaleString('ru-RU') + ' ₽',
                diffText
            ];
            context.font = 'bold 16px sans-serif';

            const textWidths = lines.map(line => context.measureText(line).width);
            const boxWidth = Math.max(...textWidths) + 20;
            const boxHeight = lines.length * 22 + 10;
            const boxX = x + 12;
            const boxY = y - boxHeight - 10;

            context.fillStyle = '#fff';
            context.strokeStyle = '#999';
            context.lineWidth = 1;
            context.fillRect(boxX, boxY, boxWidth, boxHeight);
            context.strokeRect(boxX, boxY, boxWidth, boxHeight);

            context.fillStyle = '#000';
            context.textAlign = 'center';
            lines.forEach((line, idx) => {
                context.fillStyle = idx === 1 ? color : '#000';
                context.fillText(line, boxX + boxWidth / 2, boxY + 22 + idx * 22);
            });
        }
    }

    hoverPoints(context: CanvasRenderingContext2D) {
        // Отображение точек при наведении
        if (this.hoveredOverChart) {
            data.forEach((point, i) => {
                const x = this.config.PADDING + i * this.config.STEP_X;
                const y = this.priceToY(point.price);
                context.beginPath();
                context.arc(x, y, this.config.POINT_RADIUS, 0, Math.PI * 2);
                context.fillStyle = (i === this.hoveredIndex) ? '#3b82f6' : '#90caf9';
                context.fill();
                context.strokeStyle = '#fff';
                context.stroke();
            });
        }
    }

    destroy() {

    }


}