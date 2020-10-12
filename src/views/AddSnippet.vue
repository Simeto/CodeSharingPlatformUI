<template>
    <div>
        <editor 
            :edit="true" 
            :isOwner="false" 
            :isEditor="true" 
        />
    </div>
</template>

<script>
import Editor from '@/parts/SnippetEditor'
export default {
    name: 'AddSnippet',
    components: {
      Editor  
    }
}
</script>