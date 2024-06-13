class Test {
    async execute() {
        this.func1();
    }

    async func1() {
        console.log('1');
        let b = this.func2();
        console.log('2');
    }

    async func2() {
        console.log('3');
        await this.apiEndPointCall();
        console.log('4');
    }

    async apiEndPointCall() {
        console.log('hello world');
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('api call complete');
    }


}

(new Test()).execute();

// 1
// 3
// hello world
// 4
// 2
// api call complete