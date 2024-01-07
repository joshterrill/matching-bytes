const { compareBinaries } = require('../index');
import 'mocha';

(async () => {
    const filePath1 = __dirname + '/sample-images/midjourney-big-11.webp';
    const filePath2 = __dirname + '/sample-images/midjourney-big-12.webp';
    const assert = await import('chai').then(c => c.assert)
    
    
        it('should return an array with sequence, index1, and index2 keys', async () => {
            const data = await compareBinaries(filePath1, filePath2);
            expect(data).to.be.an('array');
        });
    
})();
