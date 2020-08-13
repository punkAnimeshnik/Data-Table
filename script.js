
var app = new Vue({
    el: '#app',
    data: {
        totalPage:0,
        start:0,
        end:0,
        postOffices: []
    },
    props:{
        current:{
            type: Number,
            default: 1
        },
        total:{
            type: Number,
            default: 100
        },

        limit:{
            type: Number,
            default: 10
        },
        pageRange:{
            type: Number,
            default: 3
        }
    },
    methods: {
        hasFirst: function() {
            return this.rangeStart !== 1
        },
        hasLast: function() {
            return this.rangeEnd < this.totalPage
        },
        Limit: function(){
            this.end=this.start + this.limit
            this.totalPage = Math.ceil(this.total/this.limit)
        },
        nextPage: function(page){
            this.start = (page - 1) * this.limit
            this.end= this.start+ this.limit
            this.current = page
            if (Number.isInteger(page*this.limit/100)){
                let num = page*this.limit
                axios
                    .get('http://api.odesseo.com.ua/warehouses?limit=100&skip=100')
                    .then(response => (this.postOffices.push.apply(response.data.data)  ))
                    .catch(error => console.log(error));
                console.log(this.postOffices)
            }
        },
    },
    computed:{
        pages: function(){
            let pages = []

            for (var i = this.rangeStart; i <= this.rangeEnd; i++){
                pages.push(i)
            }
            return pages
        },
        rangeStart: function(){
            let startPage = this.current - this.pageRange
            return ( startPage > 0 )? startPage : 1
        },
        rangeEnd: function(){
            let endPage = this.current + this.pageRange
            return ( endPage <this.totalPage)? endPage : this.totalPage
        }
    },
    mounted() {
        axios
            .get('http://api.odesseo.com.ua/warehouses?limit=100')
            .then(response => (this.postOffices = response.data.data ))
            .catch(error => console.log(error));
    },
    created: function() {
        console.log(Number.isInteger(10*20/100))
        this.Limit()
    }
})
