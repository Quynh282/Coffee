class Paginator {
    constructor(page = 1, limit = 5) {
        this.limit = parseInt(limit);
        if (isNaN(this.limit) || this.limit < 1) this.limit = 5;

        this.page = parseInt(page);
        if (isNaN(this.page) || this.page < 1) this.page = 1;

        this.offset = (this.page - 1) * this.limit;
    }

    getMetadata(totalRecords) {
        if (totalRecords === 0) return {};

        const totalPages = Math.ceil(totalRecords / this.limit);

        return {
            totalRecords,
            page: this.page,
            limit: this.limit,
            firstPage: 1,
            lastPage: totalPages
        };
    }
}

module.exports = Paginator;
